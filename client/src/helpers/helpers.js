
export const aux = props => props.children

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const dateFormat = date => {
  let today = new Date(date)
  let dd = today.getDate()
  let mm = today.getMonth()+1 //January is 0!
  let yyyy = today.getFullYear()
  let hour = today.getHours() % 12
  if (hour === 0)
    hour = 12
  let min = today.getMinutes()
  if (min < 10)
    min='0'+min
  let aorp = 'AM'
  if (today.getHours() >= 12 && today.getHours() < 24)
    aorp = 'PM'
    if(dd<10)
        dd='0'+dd
    if(mm<10)
        mm='0'+mm
  return mm+'/'+dd+'/'+yyyy+'  '+hour+':'+min+" "+aorp
}
