export interface Post {
  id:string,
  uid: string;
  username:string;
  title: string;
  description: string;
  tags: [{ name:string, icon: string }]
  question: string;
  answers:[{uid:string, text: string, username:string}];
  comments: [{comment:string, uid:string, username:string}]
}


export interface Chip {
  name: string;
  icon: string;
}
