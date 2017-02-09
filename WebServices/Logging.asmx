<%@  WebService Language="C#" Class="LoggingWebService" %>


[System.Web.Services.WebService(Namespace = "http://tempuri.org/")]
[System.Web.Services.WebServiceBinding(ConformsTo = System.Web.Services.WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class LoggingWebService : System.Web.Services.WebService
{
	[System.Web.Services.WebMethod]
	public string SendMail(string type, string message, string script, string line)
	{
		System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
		return jss.Serialize(SendMail("JavaScript " + type, string.Format("{0}{1}{0}{0}{2}{0}{0}{3}", System.Environment.NewLine, message, script, line), type == "error"));
	}

	/// <summary>
	/// Sends the bug mail
	/// </summary>
	/// <param name="strSubject">The subject</param>
	/// <param name="strMessage">The message</param>
	/// <param name="blHighPriority">if set to <c>true</c> [mail with high priority]</param>
	private bool SendMail(string strSubject, string strMessage, bool blHighPriority)
	{
		System.Net.Mail.MailMessage message = new System.Net.Mail.MailMessage();
		System.Net.Mail.SmtpClient mailClient = new System.Net.Mail.SmtpClient();

		try
		{
			mailClient.Host = "127.0.0.1";
			message.From = new System.Net.Mail.MailAddress("mail@domain.com");

			message.To.Add("bugs@domain.com");

			if (blHighPriority)
			{
				message.Priority = System.Net.Mail.MailPriority.High;
			}

			message.Subject = "[ERROR] " + strSubject;
			message.Body = strMessage;

			mailClient.Send(message);
			return true;
		}
		catch
		{
			return false;
		}
	}
}