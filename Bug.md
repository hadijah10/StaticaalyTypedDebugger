# Bug One
In advancedSettings.ts there was a syntax error in the capFirstLetter method. To retrieve the first letter the word variable was changed word[0].

# Bug Two
The formatTime method in class advancedSetting.ts. There was a type error. The setHour, setMinutes methods of dailyAlarmTime needs a number to be parse  but a string was passed instead. Hence the type of hour and min  were casted into an integer to fix it.

# Bug Three
The timeDifference method in class advancedSetting.ts contained a syntax error. To compute the time difference the getTime method is to be called on the date.

# Bug Four
In general.ts, there is a syntax error in key declaration in the componentsData.This was altered to fix it.

# Bug Five
The updateComponentData  method in general.ts contained a logical error. The this.componentsData[data.name] was assigned data to be updated. Previously, this.componentsData was not updated.