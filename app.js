// Input UI
const loanForm = document.querySelector('#loan-form');
const amountInput = document.querySelector('#amount'); 
const yearsInput = document.querySelector('#years'); 
const interestInput = document.querySelector('#interest'); 
const calculateBtn = document.querySelector('#calculate');

// Results UI
const results = document.querySelector('#results');
const monthlyRepaymentsDisplay = document.querySelector('#monthlyRepayments');
const totalInterestDisplay = document.querySelector('#totalInterest');
const totalPaymentDisplay = document.querySelector('#totalRepayment')

// Loading UI
const loading = document.querySelector('#loading');

// Listen for Submit on Load form
loanForm.addEventListener('submit', (e)=>{
    // Hide results 
    results.classList.add('d-none'); 

    // show loader
    loading.classList.remove('d-none');

    setTimeout(calculateResults, 2000);

    e.preventDefault(); 
})

function calculateResults(e) {

    const principal = parseFloat(amountInput.value);
    const calculatedInterest = parseFloat(interestInput.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsInput.value) * 12; 

    // Calculate Monthly Payments
    const x = Math.pow(1+calculatedInterest, calculatedPayments); 
    const monthly = (principal*x*calculatedInterest)/(x-1); 

    if (isFinite(monthly)) {
      monthlyRepaymentsDisplay.value = monthly.toFixed(2);
      totalPaymentDisplay.value = (monthly * calculatedPayments).toFixed(2); 
      totalInterestDisplay.value = ((monthly*calculatedPayments) - principal).toFixed(2);
      loading.classList.add('d-none');
      results.classList.remove('d-none'); 
           
    } else {
        loading.classList.add('d-none');
        showError(); 
    }

}


function showError(error) {

    console.log('error');
    const errorMessage = document.createElement('p');
    errorMessage.className = 'alert alert-danger mt-3'; 
    errorMessage.textContent = 'Please check input values';
    loanForm.appendChild(errorMessage); 

    
}