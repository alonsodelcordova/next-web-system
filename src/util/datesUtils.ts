import { format, parseISO } from 'date-fns';

export const formatoFecha = (fecha: string) => {
    const dateIso =  parseISO(fecha);
    return format(dateIso, 'dd/MM/yyyy HH:mm a');
}