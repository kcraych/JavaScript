//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PotLuckSignUp.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class PotluckItem
    {
        public int ItemId { get; set; }
        public int PotluckId { get; set; }
        public string GuestName { get; set; }
        public string ItemType { get; set; }
        public string ItemDesc { get; set; }
        public Nullable<int> ItemQty { get; set; }
    }
}
