import Tag from './Tag'

interface Note {
  title: string;
  content: string;
  createDate?: string;
  tags?: Tag[];
  id?: number;
  user?: string;
}

export default Note