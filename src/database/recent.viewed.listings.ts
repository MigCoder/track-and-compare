import { BehaviorSubject } from 'rxjs'
import { Listing } from '../models/listing'

export class RecentViewedListings {
  public static listings = new BehaviorSubject<Listing[]>([])

  public static init() {
    const viewedListings = localStorage.getItem('recentViewedListings')
    if (viewedListings) {
      RecentViewedListings.listings.next(
        JSON.parse(viewedListings)
      )
    }
  }

  public static push(listing: Listing) {
    const newListings = [
      listing,
      ...RecentViewedListings.listings.getValue()
        .filter(x => x.name !== listing.name)
    ]
    RecentViewedListings.listings.next(newListings)
    localStorage.setItem('recentViewedListings', JSON.stringify(newListings))
  }

  public static clear() {
    RecentViewedListings.listings.next([])
    localStorage.removeItem('recentViewedListings')
  }
}
