using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.AspNetCore.HttpOverrides;
using Wishlist.Data;
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

builder.Services.AddDataProtection().UseCryptographicAlgorithms(
    new AuthenticatedEncryptorConfiguration
    {
        EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC,
        ValidationAlgorithm = ValidationAlgorithm.HMACSHA256
    });

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

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