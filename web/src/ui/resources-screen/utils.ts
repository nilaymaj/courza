import { Resource } from '../../types';

export type CategorisedResources = {
  [categoryName: string]: Resource[];
};

/**
 * Takes an array of resources and returns
 *
 * @param {string} name Description of the variable
 * @returns {string} Description of the return type
 */
export const categoriseResources = (
  resources: Resource[]
): CategorisedResources => {
  const result = {};
  resources.forEach((r) => {
    const categoryName = r.category.name;
    if (!result[categoryName]) result[categoryName] = [];
    result[categoryName].push(r);
  });
  return result;
};
