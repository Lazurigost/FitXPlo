namespace FitXPlo.Data.Models
{
    public class FavoriteModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserModel User { get; set; }
        public int PublicationId { get; set; }
        public PublicationModel Publication { get; set; }
    }
}
