import { createContext, useContext } from "react";

export const QuestionsContext = createContext();

export function useQuestionsContext() {
    return useContext(QuestionsContext);
}
