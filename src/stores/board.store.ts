import { create } from 'zustand';


interface BoardStore {
    title: string;
    contents: string;
    images: File[];
    location: string;

    setTitle: (title: string) => void;
    setContents: (contents: string) => void;
    setImages: (images: File[]) => void;
    setLocation: (location: string) => void;

    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    title: '',
    contents: '',
    images: [],
    location: '',

    setTitle: (title: string) => {set((state) => ({ ...state, title }))},
    setContents: (contents: string) => {set((state) => ({ ...state, contents }))},
    setImages: (images: File[]) => {set((state) => ({ ...state, images }))},
    setLocation: (location: string) => {set((state) => ({...state, location}))},

    resetBoard: () => {set((state) => ({ ...state, title: '', contents: '', images: [], location: '' }))}
}));

export default useBoardStore;