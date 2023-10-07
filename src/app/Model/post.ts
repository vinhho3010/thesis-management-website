import { AccountInfo } from "./account-info";
import { Class } from "./class";

export interface Post {
  user: AccountInfo;
  class: Class;
  content: string;
  replyTo: Post;
  CreateAt: Date;
  UpdateAt: Date;
}
