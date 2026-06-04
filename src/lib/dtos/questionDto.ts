import type {
    DifficultyLevel,
  ResourceStatus,
  VersionStatus,
} from "../../generated/prisma/enums";

export interface CreateQuestionDto {
  questionText: string;
  questionType: string;
  options: OptionDto[];
  cagetoryId: string;
  domainId: string;
  score: number;
  difficultyLevel: DifficultyLevel
  organizationId: string
}

export interface UpdateQuestionDto extends CreateQuestionDto{
    questionId: string
}

export interface OptionDto {
  text: string;
  isCorrect: boolean;
}

export interface ISaveQuestion {
  question: {
    organizationId: string;
    isSystem: boolean;
    resourceStatus: ResourceStatus;
  };
  questionVersion: {
    questionText: string;
    questionType: string;
    hash: string;
    categoryId: string;
    domainId: string;
    score: number;
  difficultyLevel: DifficultyLevel
  version: number
    versionStatus: VersionStatus;
  };
  questionOption: {
    hash: string,
    options: {text: string, isCorrect: boolean}[]
  }
}

export interface IUpdateQuestion {
    questionVersion: {
        questionText: string;
    questionType: string;
    hash: string;
    categoryId: string;
    domainId: string;
    score: number;
  difficultyLevel: DifficultyLevel
    }
    questionOption: {
    id: string,
    hash: string,
    options: {text: string, isCorrect: boolean}[]
  }
}


export interface QuestionVersionId {
    id: string,
    version: number
}

export type CreateQuestionVersionDto= Partial<CreateQuestionDto>