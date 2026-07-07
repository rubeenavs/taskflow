using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManager.API.Data;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [Route("api/projects/{projectId}/tasks")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }

        // Helper: checks the project exists AND belongs to the current user
        private async Task<Project?> GetOwnedProjectAsync(int projectId)
        {
            var userId = GetUserId();
            return await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);
        }

        // GET: api/projects/5/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItemDto>>> GetTasks(int projectId)
        {
            var project = await GetOwnedProjectAsync(projectId);
            if (project == null) return NotFound("Project not found.");

            var tasks = await _context.Tasks
                .Where(t => t.ProjectId == projectId)
                .Select(t => new TaskItemDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status,
                    Priority = t.Priority,
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    ProjectId = t.ProjectId
                })
                .ToListAsync();

            return Ok(tasks);
        }

        // GET: api/projects/5/tasks/3
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItemDto>> GetTask(int projectId, int id)
        {
            var project = await GetOwnedProjectAsync(projectId);
            if (project == null) return NotFound("Project not found.");

            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

            if (task == null) return NotFound("Task not found.");

            var dto = new TaskItemDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Status = task.Status,
                Priority = task.Priority,
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt,
                ProjectId = task.ProjectId
            };

            return Ok(dto);
        }

        // POST: api/projects/5/tasks
        [HttpPost]
        public async Task<ActionResult<TaskItemDto>> CreateTask(int projectId, CreateTaskItemDto input)
        {
            var project = await GetOwnedProjectAsync(projectId);
            if (project == null) return NotFound("Project not found.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var task = new TaskItem
                {
                    Title = input.Title,
                    Description = input.Description,
                    Status = input.Status,
                    Priority = input.Priority,
                    DueDate = input.DueDate,
                    ProjectId = projectId
                };

                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();

                var dto = new TaskItemDto
                {
                    Id = task.Id,
                    Title = task.Title,
                    Description = task.Description,
                    Status = task.Status,
                    Priority = task.Priority,
                    DueDate = task.DueDate,
                    CreatedAt = task.CreatedAt,
                    ProjectId = task.ProjectId
                };

                return CreatedAtAction(nameof(GetTask), new { projectId = projectId, id = task.Id }, dto);
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred while saving the task.");
            }
        }

            // PUT: api/projects/5/tasks/3
            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateTask(int projectId, int id, UpdateTaskItemDto input)
            {
                var project = await GetOwnedProjectAsync(projectId);
                if (project == null) return NotFound("Project not found.");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

                if (task == null) return NotFound("Task not found.");

                try
                {

                    task.Title = input.Title;
                    task.Description = input.Description;
                    task.Status = input.Status;
                    task.Priority = input.Priority;
                    task.DueDate = input.DueDate;

                    await _context.SaveChangesAsync();

                    return NoContent();
                }
                catch (Exception)
                {
                    return StatusCode(500, "An unexpected error occurred while updating the task.");
                }
            }

            // DELETE: api/projects/5/tasks/3
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteTask(int projectId, int id)
            {
                var project = await GetOwnedProjectAsync(projectId);
                if (project == null) return NotFound("Project not found.");

                var task = await _context.Tasks
                    .FirstOrDefaultAsync(t => t.Id == id && t.ProjectId == projectId);

                if (task == null) return NotFound("Task not found.");

                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();

                return NoContent();
            }
        }
    }
