import moment from 'moment'

class Services {
  public generateId() : number {
    return Math.floor(Math.random() * 1000000)
  }

  public formatDate(date: string) : string {
    return moment(date).format('HH:mm, DD.MM.YYYY')
  }
}

export default new Services()