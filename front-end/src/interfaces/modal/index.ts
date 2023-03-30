export interface iModalContext {
  isPost: boolean;
  onPost: () => void;
  postClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  patch?: iModalContextPatch;
  setPatch: React.Dispatch<
    React.SetStateAction<iModalContextPatch | undefined>
  >;
}

export interface iModalContextPatch {
  id: string;
  name: string;
  email: string;
  telephone: string;
}
