import { User } from "./user";

export class Post {
  id:number;
  content:string;
  created_at:string;
  user?: User;

  constructor(post:any){
    this.id = post.id || 0; 
    this.content = post.content || ""
    this.created_at = post.created_at || ""
    this.user = post.user || null;
  }
}
