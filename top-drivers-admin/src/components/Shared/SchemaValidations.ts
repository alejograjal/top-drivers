import * as yup from 'yup';
import { timeRegex } from 'utils/util';

const hourValidation = yup
    .string()
    .matches(timeRegex, 'Debe contener el formato de 24 horas (HH:mm)')
    .required('Hora es requerida');

const endHourValidation = yup
    .string()
    .matches(timeRegex, 'Hora de fin debe contener el formato de 24 horas (HH:mm)')
    .required('Hora de fin es requerida')
    .test('is-after-start', 'Hora de fin no puede estar antes de la hora de inicio', function (value) {
        if (!value) {
            return false;
        }

        const { startHour } = this.parent;
        const [startHours, startMinutes] = startHour.split(':').map(Number);

        const [endHoursStr = '0', endMinutesStr = '0'] = value.split(':');
        const endHours = Number(endHoursStr);
        const endMinutes = Number(endMinutesStr);

        if (isNaN(endHours) || isNaN(endMinutes)) {
            return false;
        }

        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;

        return endTotalMinutes > startTotalMinutes;
    });

export { hourValidation, endHourValidation };
