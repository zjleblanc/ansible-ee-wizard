import { IVersionOperator } from "../interfaces/version-operator.interface";

export const PEP_OPERATORS : IVersionOperator[] = [
  {
    operator: "==",
    description: "exact match"
  },
  {
    operator: "~=",
    description: "compatible release"
  },
  {
    operator: ">=",
    description: "inclusive greater than"
  },
  {
    operator: ">",
    description: "exclusive greater than"
  },
  {
    operator: "<",
    description: "exclusive less than"
  },
  {
    operator: "<=",
    description: "inclusive less than"
  },
  {
    operator: "===",
    description: "arbitrary equality"
  },
  {
    operator: "!=",
    description: "version exclusion"
  }
]
