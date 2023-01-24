import { createTestAccount } from "nodemailer";
import * as imap from "imap-simple";
import * as mailparser from "mailparser";

interface Account {
  user: string;
  pass: string;
}

export interface PlainEmail {
  from: {
    text: string;
  };
  subject: string;
  text: string;
}

export interface Email {
  from: string;
  subject: string;
  text: string;
}

export class Mailer {
  account: Account | null;
  connection: unknown;
  maxCount: number;

  constructor() {
    this.maxCount = 100;
    this.account = null;
    this.connection = null;
  }

  async getEmailAccount() {
    if (this.account) {
      return this.account.user;
    }
    const account = await createTestAccount();

    this.account = {
      user: account.user,
      pass: account.pass,
    };

    return this.account.user;
  }

  async watchMailerMessage({ subject }: { subject: string }) {
    if (!this.account) {
      await this.getEmailAccount();
    }

    if (!this.account) {
      throw new Error("Account has not been created!");
    }

    const connection = await imap.connect({
      imap: {
        user: this.account.user,
        password: this.account.pass,
        host: "imap.ethereal.email",
        port: 993,
        tls: true,
        authTimeout: 20000,
      },
    });

    return new Promise((resolve, reject) => {
      const maxCount = 100;
      let count = 0;
      let intervalId: ReturnType<typeof setInterval> | null = null;

      const watcher = async () => {
        if (count > maxCount) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          connection.end;
          reject("Code has not been found");
        }
        count++;

        // grab up to 10 emails from the inbox
        await connection.openBox("INBOX");
        const searchCriteria = ["1:10", ["SUBJECT", subject]];

        const fetchOptions = {
          bodies: [""],
        };

        const messages = await connection.search(searchCriteria, fetchOptions);

        if (!messages?.length) {
          return null;
        }

        const mail = await mailparser.simpleParser(
          messages.at(-1)?.parts[0].body,
        );

        const formattedEmail = this.cleanEmail(mail);

        connection.end;
        if (intervalId) {
          clearInterval(intervalId);
        }
        resolve(formattedEmail);
      };

      intervalId = setInterval(watcher, 4000);
    });
  }

  private cleanEmail(email: unknown): Email {
    if (!this.isEmail(email)) {
      throw new Error("");
    }
    return {
      from: email.from.text,
      subject: email.subject,
      text: email.text,
    };
  }

  private isEmail(email: unknown): email is PlainEmail {
    return (
      typeof email === "object" &&
      email !== null &&
      "subject" in email &&
      "text" in email &&
      "from" in email
    );
  }
}
