import {Crumb, Item, ResponseData} from "../types/sharedTypes";

export const getCrumbs = (list: any[]): Crumb[] => {
  const crumbs: Crumb[] = [];
  let fullPath = '';
  list.forEach((itm: any, idx: number) => {
    fullPath += itm.path;
    crumbs.push({
      label: itm.name,
      url: fullPath,
      active: list.length - 1 === idx
    });
  })
  return crumbs;
}


export const getNotStartedItems = (data: ResponseData): Item[] =>{
  const { all, completed, inProgress } = data;

  const excludedIds = new Set([
    ...completed.map(item => item.id),
    ...inProgress.map(item => item.id),
  ]);

  return all.filter(item => !excludedIds.has(item.id));
}


export const truncateString = (text: string, maxLength: number = 30): string  => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}