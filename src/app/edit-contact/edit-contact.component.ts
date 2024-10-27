import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import {
  addressTypeValues,
  Contact,
  phoneTypeValues,
} from "../contacts/contact.model";
import { FormsModule, NgForm } from "@angular/forms";
import { ContactsService } from "../contacts/contacts.service";
import { RestrictedWordsValidator } from "../validator/restricted-words-validator-directives";
import { DateValueAccessorDirective } from "../date-value-accessor/date-value-accessor.directive";
import { ProfileIconSelectorComponent } from "../profile-icon-selector/profile-icon-selector.component";

@Component({
  imports: [
    CommonModule,
    FormsModule,
    RestrictedWordsValidator,
    DateValueAccessorDirective,
    ProfileIconSelectorComponent,
  ],
  standalone: true,
  templateUrl: "./edit-contact.component.html",
  styleUrls: ["./edit-contact.component.css"],
})
export class EditContactComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router
  ) {}

  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  restrictedWords = ["Fuck", "Asshole", "Shit", "Dumbass"];

  contact: Contact = {
    id: "",
    icon: "",
    personal: false,
    note: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    favoritesRanking: 0,
    phones: [{ phoneNumber: "", phoneType: "" }],
    address: {
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      addressType: "",
    },
  };

  ngOnInit() {
    const contactId = this.route.snapshot.params["id"];
    if (!contactId) return;
    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (contact) this.contact = contact;
    });
  }

  saveContact(form: NgForm) {
    // this.contactsService
    //   .saveContact(this.contact)
    //   .subscribe(() => this.router.navigate(["/contacts"]));
    this.contactsService.saveContact(this.contact).subscribe({
      next: () => this.router.navigate(["/contacts"]),
      error: (err) => console.error(err),
    });
  }

  onAddPhone() {
    this.contact.phones.push({ phoneNumber: "", phoneType: "" });
  }
}
