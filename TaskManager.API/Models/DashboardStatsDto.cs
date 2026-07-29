namespace TaskManager.API.Models
{
    public class DashboardStatsDto
    {
        public int TotalProjects { get; set; }
        public int TotalTasks { get; set; }
        public int TodoCount { get; set; }
        public int InProgressCount { get; set; }
        public int DoneCount { get; set; }
    }
}
