import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, WalletIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetWalletQuery } from "@/app/service/userApiSlice";
import { useEffect, useState } from "react";


// ];

const Wallet = () => {
  const [wallet, setWallet] = useState(null);

  const { data: transactions } = useGetWalletQuery();

  useEffect(() => {
    if (transactions) {
      setWallet(transactions.wallet);
    }
  }, [transactions]);

  return (
    <div className="flex-1 p-6  dark:bg-gray-900 font-primary">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <WalletIcon size={24} />
              <CardTitle className="text-xl font-bold">Wallet</CardTitle>
            </div>
            <Button variant="secondary" size="sm">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-muted-foreground">
                  Current Balance
                </h2>
                <p className="text-2xl font-bold">
                  ₹{wallet && wallet.balanceAmount}
                </p>
              </div>
         
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
                Recent Transactions
              </h2>
              {wallet && wallet.transactions.length == 0 ? (
                <h2>No recent transaction </h2>
              ) : (
                <>
                  <ScrollArea className="h-[300px] w-full rounded-md border">
                    <div className="p-4 space-y-4">
                      {wallet &&
                        wallet.transactions?.map((transaction) => (
                          <div
                            key={transaction?.orderId}
                            className="flex justify-between items-center py-2 border-b last:border-b-0"
                          >
                            <div>
                              <p className="text-sm">
                                {transaction?.description}
                              </p>
                              <p
                                className={`text-sm ${
                                  transaction.transactionType == "credited"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {transaction.transactionType}
                              </p>
                            </div>
                            <p
                              className={`font-semibold ${
                                transaction.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction?.amount > 0 ? "+" : "-"}$
                              {Math.abs(transaction?.amount).toFixed(2)}
                            </p>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
