using M_files_API.models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;
using System.Xml.Linq;

namespace M_files_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //http://localhost/REST/structure/classes/78 api client class
        //http://localhost/REST/structure/classes?objtype=136 class from object type
        //http://localhost/REST/objects.aspx?q=ahmed&o=136 search by prop in a objec type

        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;

        public AuthController(IHttpClientFactory clientFactory , IConfiguration configuration)
        {
            _clientFactory = clientFactory;
            _configuration = configuration;
        }
        [HttpPost]
        public async Task<IActionResult> Login( Login auth)
        {
            auth.VaultGuid = "{456C32E6-66C5-4369-BE6E-E76D3793FD0D}";
            var client = _clientFactory.CreateClient();
            var apiEndpoint = "http://localhost/REST/server/authenticationtokens";

            try
            {
                var response = await client.PostAsJsonAsync(apiEndpoint, auth);

                if (response.IsSuccessStatusCode)
                {
                    
                    string jsonResult = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<dynamic>(jsonResult);
                    string token = result.Value;
                    _configuration["ApiToken"] = token;

                    
                    client.DefaultRequestHeaders.Add("X-Authentication", token);
                    var res = await client.GetAsync("http://localhost/REST/views/items.aspx");
                    return new ContentResult
                    {
                        Content = JsonConvert.SerializeObject(res),
                        ContentType = "application/json",
                        StatusCode = (int) res.StatusCode
                    };
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (HttpRequestException)
            {
                return StatusCode(500, "Failed to communicate with the external API.");
            }
        }
        [HttpGet]
        public async Task<IActionResult> searchInClientByProperty([FromQuery] string property)
        {
            var url = new Uri("http://localhost/REST/objects.aspx?p0="+property+"&o=136");
            string apiToken = _configuration["ApiToken"]; 
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("X-Authentication", apiToken);

                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string jsonData = await response.Content.ReadAsStringAsync();

                    return Ok(jsonData);
                }
                else
                {
                    return StatusCode((int)response.StatusCode,response.ReasonPhrase);
                }

            }
        }
        [HttpGet]
        public async Task<IActionResult> searchDocument([FromQuery] string property)
        {
            var url = new Uri("http://localhost/REST/objects.aspx?p0=" + property + "&o=0");
            string apiToken = _configuration["ApiToken"];
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("X-Authentication", apiToken);

                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string jsonData = await response.Content.ReadAsStringAsync();

                    return Ok(jsonData);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }

            }
        }
        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            var url = new Uri("http://localhost/REST/files.aspx");
            string apiToken = _configuration["ApiToken"];
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("X-Authentication", apiToken);

                var content = new MultipartFormDataContent();
                var fileStream = new StreamContent(file.OpenReadStream());
                content.Add(fileStream, "file", file.FileName);
                HttpResponseMessage response = await client.PostAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    string jsonData = await response.Content.ReadAsStringAsync();

                    return Ok(jsonData);
                }
                else
                {
                    return StatusCode((int)response.StatusCode, response.ReasonPhrase);
                }

            }
        }
    }
}
