import { IVersionOperator } from "../interfaces/version-operator.interface";

export const GALAXY_OPERATORS : IVersionOperator[] = [
  {
    operator: "==",
    description: "exact match"
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
    operator: "*",
    description: "latest version"
  },
  {
    operator: "!=",
    description: "version exclusion"
  },
  {
    operator: "<=",
    description: "inclusive less than"
  },
  {
    operator: "<",
    description: "exclusive less than"
  }
]
