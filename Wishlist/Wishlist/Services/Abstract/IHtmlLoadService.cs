using AngleSharp.Html.Dom;

namespace Wishlist.Wishlist.Services.Abstract;

public interface IHtmlLoadService
{
    Task<IHtmlDocument?> Load(string url);
}