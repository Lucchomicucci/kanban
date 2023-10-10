export type State = 'todo' | 'doing' | 'done'
export type Move = 'left' | 'right'
export interface IList {
    title: string;
    id: number;
    state: State;
}