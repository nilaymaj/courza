import mailJet from 'node-mailjet';
import credentials from '../keys/mailjet-credentials.json';

const hostDomain = process.env.CZ_HTTP_HOST || 'http://localhost:3000';

const SENDER_EMAIL = 'courza.dev@gmail.com';
const URL_PREFIX = hostDomain + '/verify?token=';

let _mailService: mailJet.Email.Client;

/**
 * Creates a MailJet-specific object with mail details and content
 * for an account verification mail
 */
const createVerificationMail = (
  userEmail: string,
  verificationToken: string
) => {
  return {
    To: [{ Email: userEmail, Name: 'User' }],
    From: { Email: SENDER_EMAIL, Name: 'Courza' },
    Subject: 'Courza - Verify your account!',
    TextPart: `
Hey!
Verify your account and start using Courza, by following the link given below:
${URL_PREFIX + verificationToken}

The link will be active for only 30 minutes, so be quick!
    `,
    HTMLPart: `<html>
    Hey!<br><br>
    Verify your account and start using Courza, by following the link given below:<br>
    <a href='${URL_PREFIX + verificationToken}'>Verify your account</a>
    <br><br>
    The link will be active for only 30 minutes, so be quick!
        </html>`,
    CustomID: 'AppGettingStartedTest',
  };
};

/**
 * Initializes mail service for use
 */
export const initMailService = () => {
  _mailService = mailJet.connect(credentials.key, credentials.secret);
};

/**
 * Sends a verification link to the specified user email
 */
export const sendVerificationMail = async (
  userEmail: string,
  verificationLink: string
) => {
  const mail = createVerificationMail(userEmail, verificationLink);
  try {
    await _mailService
      .post('send', { version: 'v3.1' })
      .request({ Messages: [mail] });
  } catch (error) {
    console.log(error);
  }
};
