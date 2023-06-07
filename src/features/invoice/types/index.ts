import { Entity } from '../../misc/types/entity.ts';

export interface Invoice extends Entity {
  subject: string;
  salesorder_id: string;
  customerno: string;
  contact_id: string;
  invoicedate: string;
  duedate: string;
  vtiger_purchaseorder: string;
  txtAdjustment: number;
  salescommission: number;
  exciseduty: number;
  hdnSubTotal: number;
  hdnGrandTotal: number;
  hdnTaxType: string;
  hdnDiscountPercent: string;
  hdnDiscountAmount: string;
  hdnS_H_Amount: number;
  account_id: string;
  invoicestatus: string;
  currency_id: string;
  conversion_rate: number;
  bill_street: string;
  ship_street: string;
  bill_city: string;
  ship_city: string;
  bill_state: string;
  ship_state: string;
  bill_code: string;
  ship_code: string;
  bill_country: string;
  ship_country: string;
  bill_pobox: string;
  ship_pobox: string;
  description: string;
  terms_conditions: string;
  invoice_no: string;
  pre_tax_total: number;
  received: number;
  balance: number;
  hdnS_H_Percent: number;
  potential_id: string;
  region_id: string;
  'shipping_&_handling': number;
  'shipping_&_handling_shtax1': number;
  'shipping_&_handling_shtax2': number;
  'shipping_&_handling_shtax3': number;
  LineItems: LineItem[];
  LineItems_FinalDetails: {
    [key: string]: LineItemFinalDetails;
  };
}

type LineItem = {
  parent_id: string;
  productid: string;
  sequence_no: number;
  quantity: number;
  listprice: number;
  discount_percent: string;
  discount_amount: string;
  comment: string;
  description: string;
  incrementondel: boolean;
  tax1: number;
  tax2: number;
  tax3: number;
  image: string;
  purchase_cost: number;
  margin: number;
  id: string;
  product_name: string;
  entity_type: string;
  deleted: boolean;
};

type LineItemFinalDetails = {
  attachmentId1: null;
  attachmentName1: null;
  attachmentPath1: null;
  checked_discount_zero1: string;
  comment1: string;
  customsId1: string;
  discountTotal1: string;
  discount_amount1: number;
  discount_percent1: number;
  entityType1: string;
  final_details: {
    adjustment: string;
    chargesAndItsTaxes: {
      [key: string]: {
        taxes: {
          [key: string]: string;
        };
        value: string;
      };
    };
    deductTaxes: any[];
    deductTaxesTotalAmount: string;
    discountTotal_final: string;
    discount_amount_final: string;
    discount_percentage_final: number;
    discount_type_final: string;
    grandTotal: string;
    hdnSubTotal: number;
    preTaxTotal: string;
    sh_taxes: {
      amount: number;
      compoundon: any[];
      method: string;
      percentage: number;
      regions: any[];
      taxid: string;
      taxlabel: string;
      taxname: string;
      type: string;
    }[];
    shipping_handling_charge: string;
    shtax_totalamount: string;
    tax_totalamount: string;
    taxes: {
      [key: string]: {
        amount: string;
        compoundon: any[];
        method: string;
        percentage: string;
        regions: any[];
        taxid: string;
        taxlabel: string;
        taxname: string;
        type: string;
      };
    };
    taxtype: string;
    totalAfterDiscount: string;
  };
  hdnProductId1: string;
  hdnProductcode1: string;
  internatonalCode1: string;
  listPrice1: string;
  manufCountry1: string;
  manufCountryCode1: string;
  margin1: string;
  netPrice1: string;
  productDeleted1: boolean;
  productDescription1: null;
  productName1: string;
  productTotal1: string;
  purchaseCost1: string;
  qty1: string;
  qtyInStock1: string;
  subproduct_ids1: string;
  taxTotal1: string;
  totalAfterDiscount1: string;
  unitCode1: null;
  unitPrice1: string;
  usageunit1: string;
};
