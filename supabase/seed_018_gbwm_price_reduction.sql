-- John (seller of G-BGWM, the Piper Archer PA28-181 share) has asked for a
-- price reduction for a quick sale: £5,500 -> £4,500. This only touches the
-- price column (shown everywhere via listing.price / formatPrice — see
-- lib/listing.ts and app/listings/[slug]/page.tsx) and the description,
-- which gets a short reduction note in the opening paragraph, next to
-- where the share itself is introduced. No other fields (photos, spec
-- data, highlights, equipment, insurance points, group facts) are touched.
--
-- Same permanent URL throughout (piper-archer-pa28-181-share).
update listings set
  price = 4500,
  description = E'A 1/12 share is available in this 1979 Piper Archer PA28-181 based at Wycombe Air Park (EGTB). Price reduced to £4,500 for quick sale.\n\nThe aircraft is operated by a professionally run 12-member group and is described by the seller as being in excellent condition and exceptionally well maintained. It is always hangared, maintained by an on-airfield maintenance organisation and benefits from an updated Garmin navigation and communications package.'
where slug = 'piper-archer-pa28-181-share';
