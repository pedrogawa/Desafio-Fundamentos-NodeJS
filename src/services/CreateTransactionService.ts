import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Omit<Transaction, 'id'>): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw Error('Not enough balance!');
    }

    const transaction = this.transactionsRepository.create({
      type,
      title,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
