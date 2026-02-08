import { format, parseISO, isSameDay } from 'date-fns';

export const formatDate = (iso) => format(parseISO(iso), 'yyyy-MM-dd');
export const displayDate = (iso) => format(parseISO(iso), 'MMM d, yyyy');
export const isSameDate = (isoA, isoB) => isSameDay(parseISO(isoA), parseISO(isoB));
