using System.ComponentModel.DataAnnotations;


namespace TaskManager.API.Models
{
    // What we SEND BACK to the client
    public class TaskItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ProjectId { get; set; }
    }

    // What the client SENDS US to create a task
    public class CreateTaskItemDto
    {
        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [RegularExpression("Todo|InProgress|Done", ErrorMessage = "Status must be Todo, InProgress, or Done.")]
        public string Status { get; set; } = "Todo";

        [RegularExpression("Low|Medium|High", ErrorMessage = "Priority must be Low, Medium, or High.")]
        public string Priority { get; set; } = "Medium";
        public DateTime? DueDate { get; set; }
    }

    // What the client SENDS US to update a task
    public class UpdateTaskItemDto
    {
        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [RegularExpression("Todo|InProgress|Done", ErrorMessage = "Status must be Todo, InProgress, or Done.")]
        public string Status { get; set; } = string.Empty;

        [RegularExpression("Low|Medium|High", ErrorMessage = "Priority must be Low, Medium, or High.")]
        public string Priority { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
    }
}