// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no types
import sms from "sms-receive";

const ari10MessageMatcher = "this is your verification code to pay";
const ari10Receiver = ["+18446642604"];

interface Message {
  message: string;
}

export class Sms {
  number: string | null;
  maxCount: number;

  constructor() {
    this.number = null;
    this.maxCount = 100;
  }

  async getPhoneNumber() {
    if (this.number) {
      return this.number;
    }

    const numbers = await sms.numbers("United States");

    this.number = numbers.at(-1);

    return this.number;
  }

  async watchAri10Message() {
    const startTime = new Date();

    return new Promise((resolve, reject) => {
      const maxCount = 100;
      let count = 0;
      let intervalId: ReturnType<typeof setInterval> | null = null;

      const watcher = async () => {
        if (count > maxCount) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          reject();
        }
        count++;

        const isMatchedEmailReceived = await sms.check(
          this.number,
          ari10Receiver,
          ari10MessageMatcher,
        );

        if (isMatchedEmailReceived) {
          const messages = await sms.messages(this.number);

          const message = messages.find((message: Message) => {
            return message.message.match(ari10MessageMatcher);
          });

          // Get message only if it was received after the watcher had started
          const difference =
            (new Date().getTime() - startTime.getTime()) / 1000;

          if (message.time > difference) return;

          if (intervalId) {
            clearInterval(intervalId);
          }

          const code = message.message.slice(0, 8);
          resolve(code);
        }
      };

      intervalId = setInterval(watcher, 10000);
    });
  }
}
