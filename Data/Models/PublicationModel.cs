using Microsoft.AspNetCore.Mvc.Formatters;

namespace todolist_api.Data.Models
{
    public class PublicationModel
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public UserModel? User { get; set; }
        public string CreatorName {  get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Term { get; set; }
        public string Priority { get; set; }
        public bool IsDone { get; set; }
        public string? PublicationMedia { get; set; }
    }
}
