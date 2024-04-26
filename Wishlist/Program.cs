using Microsoft.EntityFrameworkCore;
using Wishlist.Data;
using Wishlist.Shared;
using Wishlist.Shared.Auth;
using Wishlist.Shared.Core;
using Wishlist.Shared.Core.Services.Concrete;
using Wishlist.Shared.CurrentUser;
using Wishlist.Wishlist;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
builder.Services.AddShared(builder.Configuration);
builder.Services.AddAuth(builder.Configuration);
builder.Services.AddData(builder.Configuration);
builder.Services.AddCurrentUser();
builder.Services.AddWishlist();
builder.Logging.AddProvider(new TelegramLoggerProvider(builder.Configuration));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(options => options
        .AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowAnyHeader());
}

app.UseStaticFiles();

app.MapControllers();

app.Run();