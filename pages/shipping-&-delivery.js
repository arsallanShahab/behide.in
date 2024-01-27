import Heading from '@/components/Heading';

const ShippingAndDelivery = () => {
  return (
    <div className="mx-auto max-w-4xl p-5 sm:p-10">
      <Heading className={'font-medium'}>Shipping & Delivery</Heading>
      <p className="text-slate-950 pb-10 text-lg sm:pb-20">
        For International buyers, orders are shipped and delivered through registered international
        courier companies and/or International speed post only.
        <br />
        <br /> For domestic buyers, orders are shipped through registered domestic courier companies
        and /or speed post only.
        <br />
        <br /> Orders are shipped within 6-8 days or as per the delivery date agreed at the time of
        order confirmation and delivering of the shipment subject to Courier Company / post office
        norms.
        <br />
        <br /> Behide India is not liable for any delay in delivery by the courier company / postal
        authorities and only guarantees to hand over the consignment to the courier company or
        postal authorities within 6-8 days from the date of the order and payment or as per the
        delivery date agreed at the time of order confirmation.
        <br />
        <br /> Delivery of all orders will be to the address provided by the buyer. Delivery of our
        services will be confirmed on your mail ID as specified during registration.
        <br />
        <br /> For any issues in utilizing our services you may contact our helpdesk on 9073448018
        or enquiries.behideindia@gmail.com
      </p>
    </div>
  );
};

export default ShippingAndDelivery;
