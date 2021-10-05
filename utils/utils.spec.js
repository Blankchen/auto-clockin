const utils = require('./utils')

describe('utils', () => {
    const holidayArray = [
        "2021-10-11",
        "2021-12-31", 
        "2022-01-31",
        "2022-02-01",
        "2022-02-02",
        "2022-02-03",
        "2022-02-04",
        "2022-02-28",
        "2022-04-04",
        "2022-04-05",
        "2022-06-03",
        "2022-09-09",
        "2022-10-10",
    ]

    describe('isHoliday', () => {
        
        it('is Saturday ', () => {
            const today = new Date('2021-10-16')
            expect(utils.isHoliday(today)).toBe(true)
        });

        it('is workDay', () => {
            const today = new Date('2021-10-05')
            expect(utils.isHoliday(today)).toBe(false)
        });

        it('is Saturday WorkDay', () => {
            const today = new Date('2022-01-22')
            expect(utils.isHoliday(today)).toBe(false)
        });

        test.each(holidayArray)(
            "%s is Holiday",
            (date) => {
                const today = new Date(date)
                expect(utils.isHoliday(today)).toBe(true)
            }
          );
        
    });
});