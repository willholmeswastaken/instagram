import { atom, RecoilState } from 'recoil'

export const modalState: RecoilState<boolean> = atom<boolean>({
    key: 'modalState',
    default: false
})