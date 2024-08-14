import React, { useState } from "react";
import UseBasicModal from "../../UI/Modal/UseBasicModal";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";

// import { Button } from "flowbite-react";
import SendIcon from "@mui/icons-material/Send";
import { baseUrl } from "@/src/config/serverConfig";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "translate(-50%, -50%)",
  width: { sm: 600, xs: 370 }, //
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  pt: 4,
  pb: 4,
  pl: 2,
  pr: 2,
};

const SignUpModal = ({ isModalOpen, setIsModalOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignUpEmail = (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Accessing form field values
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const body = { name, email, message };
    fetch(`${baseUrl}/send-email/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setIsLoading(false);
          toast.success("Successfully send your message");
          setIsModalOpen(false);
        } else {
          setIsLoading(false);
          toast.error("Something went wrong. Please try later");
        }
      });
  };

  const handleClose = () => setIsModalOpen(false);
  return (
    <UseBasicModal isData={true} open={isModalOpen} setOpen={setIsModalOpen}>
      <div>
        <Box sx={style}>
          <div className="relative">
            <>
              <div className="h-[500px] overflow-y-auto " id="mc_embed_shell">
                <button
                  onClick={handleClose}
                  className="absolute right-0 -top-5"
                >
                  <RxCross2 className="text-2xl text-slate-800" />
                </button>
                <link
                  href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
                  rel="stylesheet"
                  type="text/css"
                />
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%;}\n        /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.\n           We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n",
                  }}
                />
                <div id="mc_embed_signup">
                  <form
                    action="https://protonmail.us5.list-manage.com/subscribe/post?u=686f58751922907170dac8720&id=acb83b6e82&f_id=00af28ebf0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                  >
                    <div id="mc_embed_signup_scroll">
                      <h2>Subscribe to Deeparture</h2>
                      <div className="indicates-required">
                        <span className="asterisk">*</span> indicates required
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-EMAIL">
                          Email Address <span className="asterisk">*</span>
                        </label>
                        <input
                          type="email"
                          name="EMAIL"
                          className="required email"
                          id="mce-EMAIL"
                          required
                          defaultValue
                        />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-FNAME">First Name </label>
                        <input
                          type="text"
                          name="FNAME"
                          className=" text"
                          id="mce-FNAME"
                          defaultValue
                        />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-LNAME">Last Name </label>
                        <input
                          type="text"
                          name="LNAME"
                          className=" text"
                          id="mce-LNAME"
                          defaultValue
                        />
                      </div>
                      <div className="mc-address-group">
                        <div className="mc-field-group">
                          <label htmlFor="mce-ADDRESS-addr1">Address </label>
                          <input
                            type="text"
                            maxLength={70}
                            name="ADDRESS[addr1]"
                            id="mce-ADDRESS-addr1"
                            className
                            defaultValue
                          />
                        </div>
                        <div className="mc-field-group">
                          <label htmlFor="mce-ADDRESS-addr2">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            maxLength={70}
                            name="ADDRESS[addr2]"
                            id="mce-ADDRESS-addr2"
                            defaultValue
                          />
                        </div>
                        <div className="flex flex-wrap">
                          <div className="mc-field-group">
                            <label htmlFor="mce-ADDRESS-city">City</label>
                            <input
                              type="text"
                              maxLength={40}
                              name="ADDRESS[city]"
                              id="mce-ADDRESS-city"
                              className
                              defaultValue
                            />
                          </div>
                          <div className="mc-field-group">
                            <label htmlFor="mce-ADDRESS-state">
                              State/Province/Region
                            </label>
                            <input
                              type="text"
                              maxLength={20}
                              name="ADDRESS[state]"
                              id="mce-ADDRESS-state"
                              className
                              defaultValue
                            />
                          </div>
                          <div className="mc-field-group">
                            <label htmlFor="mce-ADDRESS-zip">
                              Postal / Zip Code
                            </label>
                            <input
                              type="text"
                              maxLength={10}
                              name="ADDRESS[zip]"
                              id="mce-ADDRESS-zip"
                              className
                              defaultValue
                            />
                          </div>
                        </div>
                        <div className="mc-field-group">
                          <label htmlFor="mce-ADDRESS-country">Country</label>
                          <select
                            name="ADDRESS[country]"
                            id="mce-ADDRESS-country"
                            className
                          >
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">
                              Bosnia and Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Congo">Congo</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Greece">Greece</option>
                            <option value="Guam">Guam</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">
                              Lao People's Democratic Republic
                            </option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macedonia">Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Moldova, Republic of">
                              Moldova, Republic of
                            </option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">
                              Netherlands Antilles
                            </option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Panama">Panama</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Samoa (Independent)">
                              Samoa (Independent)
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Korea">South Korea</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkiye">Turkiye</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="USA" selected>
                              USA
                            </option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vatican City State (Holy See)">
                              Vatican City State (Holy See)
                            </option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Virgin Islands (British)">
                              Virgin Islands (British)
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                            <option value="Antigua And Barbuda">
                              Antigua And Barbuda
                            </option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Aruba">Aruba</option>
                            <option value="Brunei Darussalam">
                              Brunei Darussalam
                            </option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Falkland Islands">
                              Falkland Islands
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Grenada">Grenada</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Saint Kitts and Nevis">
                              Saint Kitts and Nevis
                            </option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Macau">Macau</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Nauru">Nauru</option>
                            <option value="Niue">Niue</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Palau">Palau</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Svalbard and Jan Mayen Islands">
                              Svalbard and Jan Mayen Islands
                            </option>
                            <option value="San Marino">San Marino</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Timor-Leste">Timor-Leste</option>
                            <option value="Trinidad and Tobago">
                              Trinidad and Tobago
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Saint Vincent and the Grenadines">
                              Saint Vincent and the Grenadines
                            </option>
                            <option value="Virgin Islands (U.S.)">
                              Virgin Islands (U.S.)
                            </option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Sao Tome and Principe">
                              Sao Tome and Principe
                            </option>
                            <option value="South Georgia and the South Sandwich Islands">
                              South Georgia and the South Sandwich Islands
                            </option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="North Korea">North Korea</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                            <option value="Cuba">Cuba</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Libya">Libya</option>
                            <option value="Palestine">Palestine</option>
                            <option value="Syria">Syria</option>
                            <option value="Aaland Islands">
                              Aaland Islands
                            </option>
                            <option value="Turks & Caicos Islands">
                              Turks &amp; Caicos Islands
                            </option>
                            <option value="Jersey  (Channel Islands)">
                              Jersey (Channel Islands)
                            </option>
                            <option value="Dominica">Dominica</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Curacao">Curacao</option>
                            <option value="Sint Maarten">Sint Maarten</option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Republic of Kosovo">
                              Republic of Kosovo
                            </option>
                            <option value="Congo, Democratic Republic of the">
                              Congo, Democratic Republic of the
                            </option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Saint Martin">Saint Martin</option>
                            <option value="Bonaire, Saint Eustatius and Saba">
                              Bonaire, Saint Eustatius and Saba
                            </option>
                            <option value="Serbia">Serbia</option>
                          </select>
                        </div>
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-PHONE">Phone Number </label>
                        <input
                          type="text"
                          name="PHONE"
                          className="REQ_CSS"
                          id="mce-PHONE"
                          defaultValue
                        />
                      </div>
                      <p>
                        <a href="https://us5.campaign-archive.com/home/?u=686f58751922907170dac8720&id=acb83b6e82">
                          View previous campaigns
                        </a>
                      </p>
                      <div id="mce-responses" className="clear">
                        <div
                          className="response"
                          id="mce-error-response"
                          style={{ display: "none" }}
                        />
                        <div
                          className="response"
                          id="mce-success-response"
                          style={{ display: "none" }}
                        />
                      </div>
                      <div
                        style={{ position: "absolute", left: "-5000px" }}
                        aria-hidden="true"
                      >
                        <input
                          type="text"
                          name="b_686f58751922907170dac8720_acb83b6e82"
                          tabIndex={-1}
                          defaultValue
                        />
                      </div>
                      <div className="clear mt-3">
                        <input
                          type="submit"
                          name="subscribe"
                          id="mc-embedded-subscribe"
                          className="button"
                          defaultValue="Subscribe"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          </div>
        </Box>
      </div>
    </UseBasicModal>
  );
};

export default SignUpModal;
