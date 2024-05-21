namespace FitXPlo.Data.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public int RoleId { get; set; }
        public RoleModel Role { get; set; } = null;
        public string? UserMedia { get; set; } = null;
    }
}
