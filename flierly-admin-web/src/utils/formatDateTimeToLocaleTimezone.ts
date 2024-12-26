import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Extend dayjs with timezone and UTC plugins
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * Formats a given datetime string to the user's locale-specific timezone and format.
 * If `applyOffset` is true, it calculates the offset from the user's locale timezone
 * and adjusts the input datetime. The timezone is excluded from the output in this case.
 *
 * @param dateTimeString - The original datetime string (e.g., "2024-10-08 15:46:45.395713+05:30").
 * @param format - (Optional) The desired output format (e.g., "YYYY-MM-DD HH:mm:ss"). If not passed, default format is used.
 * @param applyOffset - (Optional) Boolean indicating whether to apply locale-based offset
 *                      and exclude timezone information from the output. Default is `false`.
 * @returns The formatted date string in the user's locale-specific timezone or adjusted by the offset.
 *
 * @throws Will throw an error if the input datetime string is invalid.
 */
function formatDateToLocaleTimezone(
  dateTimeString: string,
  format: string = 'YYYY-MM-DD HH:mm:ss', // Default format if not passed
  applyOffset: boolean = false, // Default is `false` if not passed
): string {
  try {
    // Replace space with 'T' for ISO compatibility
    const isoCompatible = dateTimeString.replace(' ', 'T')

    // Parse the datetime string into a dayjs object
    const originalDate = dayjs(isoCompatible)

    if (!originalDate.isValid()) {
      throw new Error('Invalid date format')
    }

    // Get the user's timezone from Intl API
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Get the timezone of the input datetime
    const inputTimezone = originalDate.format('Z')

    // If the provided datetime's timezone is the same as the user's timezone, return the datetime as-is
    if (inputTimezone === (userTimeZone === 'UTC' ? 'Z' : dayjs().tz(userTimeZone).format('Z'))) {
      return originalDate.format(format)
    }

    let adjustedDate

    if (applyOffset) {
      // Calculate the offset in minutes for the user's timezone
      const localeOffsetMinutes = dayjs().tz(userTimeZone).utcOffset()

      // Add the calculated offset to the input datetime
      adjustedDate = originalDate.add(localeOffsetMinutes, 'minute')
    } else {
      // Convert to the user's locale-specific timezone
      adjustedDate = originalDate.tz(userTimeZone)
    }

    // Format the adjusted date
    return adjustedDate.format(format)
  } catch (error) {
    return ''
  }
}

export default formatDateToLocaleTimezone
