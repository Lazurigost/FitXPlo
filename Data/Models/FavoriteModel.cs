using todolist_api.Data.Models;

namespace TODO_LIST.Data.Models
{
    public class FavoriteModel
    {
        public int Id { get; set; }
        public int UserId {  get; set; }
        public UserModel User { get; set; }
        public int PublicationId { get; set; }
        public PublicationModel Publication { get; set; }
    }
}
