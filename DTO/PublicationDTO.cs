using todolist_api.Data.Models;

namespace TODO_LIST.DTO
{
    public class PublicationDTO
    {
        
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Priority { get; set; }
        public bool IsDone { get; set; }
        public string? PublicationMedia { get; set; }
    }
}
