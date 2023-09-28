let today = new Date();
            let date1 = today.getDate();
            let month1 = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
            let year1 = today.getFullYear();
            if (date1 < 10) {
                date1 = '0' + date1
            }
            if (month1 < 10) {
                month1 = '0' + month1
            }
            maxDate = year1 - 18 + '-' + month1 + '-' + date1;
            minDate = year1 - 55 + '-' + month1 + '-' + date1;
            document.getElementById("dob").setAttribute("min", minDate);
            document.getElementById("dob").setAttribute("max", maxDate);

            let userInputs = localStorage.getItem("user-entries");
            if (userInputs) {
                userInputs = JSON.parse(userInputs);
        } else {
                userInputs = [];
        }

        const displayEntries = () => {
            const savedUserInputs = localStorage.getItem("user-entries");
            let entries = "";
            if (savedUserInputs) {
                const parsedUserInputs = JSON.parse(savedUserInputs);
            entries = parsedUserInputs
                    .map((entry) => {
                        const name = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const email = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const password = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dob = `<td class='border px-4 py-2'>${entry.dob}</td>`;
            const acceptTerms = `<td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>`;
            const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
            return row;
                    })
            .join("\n");
            }
            var table = `<table class="table-auto w-full"><tr>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Email</th>
                <th class="px-4 py-2">Password</th>
                <th class="px-4 py-2">Dob</th>
                <th class="px-4 py-2">Accepted terms?</th>
            </tr>${entries} </table>`;
            let details = document.getElementById("user-entries");
            details.innerHTML = table;
        };

        const saveUserForm = (event) => {
            event.preventDefault();
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const dob = document.getElementById("dob").value;
            const acceptTermsAndConditions =
                document.getElementById("acceptTerms").checked;
            const userDetails = {
                name,
                email,
                password,
                dob,
                acceptTermsAndConditions,
            };
            userInputs.push(userDetails);
            localStorage.setItem("user-entries", JSON.stringify(userInputs));

            displayEntries(); // Add this line
        };

        let form = document.getElementById("input_details");
        form.addEventListener("submit", saveUserForm, true);
        displayEntries();
