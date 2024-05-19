using Microsoft.EntityFrameworkCore;
using System.Drawing.Drawing2D;
using TODO_LIST.Data.Models;
using todolist_api.Data.Models;

namespace todolist_api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<RoleModel> Roles { get; set; }
        public DbSet<PublicationModel> Publications { get; set; }
        public DbSet<FavoriteModel> Favorites { get; set; }
        public DbSet<SubscriptionModel> Subscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().ToTable("users");
            modelBuilder.Entity<RoleModel>().ToTable("roles");
            modelBuilder.Entity<PublicationModel>().ToTable("publications");
            modelBuilder.Entity<FavoriteModel>().ToTable("favorites");
            modelBuilder.Entity<SubscriptionModel>().ToTable("subscriptions");
            base.OnModelCreating(modelBuilder);
        }
    }
}
