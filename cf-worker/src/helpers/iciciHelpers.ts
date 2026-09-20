export const parseICICISavingsTransactions = (smsMessage: string) => {
	// Implement the parsing logic here
	const result = {
		date: null,
		description: '',
		transactionType: '',
		amount: 0,
		paymentMethod: '',
		savingsAccount: '',
		note: '',
	};

	// Debit + amount
	const debitMatch = smsMessage.match(/debited\s+for\s+Rs\.?\s*([\d,]+(?:\.\d{1,2})?)/i);

	if (debitMatch) {
		result.transactionType = 'debit';
		result.amount = Number(debitMatch[1].replace(/,/g, ''));
	}

	// savingsAccount
	const accountmatch = smsMessage.match(/ICICI Bank Acct\s+(XX\d+)/i);
	if (accountmatch) {
		result.savingsAccount = accountmatch[1];
	}
	// note
	result.note = smsMessage;
	return result;
	1;
};
