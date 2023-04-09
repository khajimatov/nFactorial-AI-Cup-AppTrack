import { v4 as uuid } from "uuid";

export default function generateKey() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return uuid();
}
