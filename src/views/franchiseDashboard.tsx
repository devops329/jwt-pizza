import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import View from './view';
import { TrashIcon, CautionIcon } from '../icons';
import Button from '../components/button';
import { pizzaService } from '../service/service';
import { Franchise, Store, User } from '../service/pizzaService';

interface Props {
  user: User | null;
}

export default function FranchiseDashboard(props: Props) {
  const navigate = useNavigate();
  const [franchise, setFranchise] = React.useState<Franchise | null>(null);

  React.useEffect(() => {
    (async () => {
      if (props.user) {
        const franchises = await pizzaService.getFranchise(props.user);
        if (franchises.length) setFranchise(franchises[0]);
      }
    })();
  }, [props.user]);

  function createStore() {
    navigate('/franchise-dashboard/create-store', { state: { franchise: franchise } });
  }

  function closeStore(franchise: Franchise, store: Store) {
    navigate('/franchise-dashboard/close-store', { state: { franchise: franchise, store: store } });
  }

  if (!franchise) {
    return whyFranchise();
  }

  return (
    <View title={franchise.name}>
      <div className="text-jwt-brown">Everything you need to run an JWT Pizza franchise. Your gateway to success.</div>

      <div className="bg-neutral-100 overflow-clip my-4">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-dominos-gray-200">
                  <thead className="uppercase text-jwt-brown bg-dominos-sky border-b-2 border-dominos-blue">
                    <tr>
                      {['Name', 'Revenue', 'Action'].map((header) => (
                        <th key={header} scope="col" className="px-6 py-3 text-center text-xs font-medium">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dominos-gray-200">
                    {franchise.stores?.map((store, index) => (
                      <tr key={index} className="hover:bg-dominos-gray-100">
                        <td className="px-6 py-4 text-sm text-center font-medium text-dominos-gray-900">{store.name}</td>
                        <td className="px-6 py-4 text-end text-sm text-dominos-gray-900">{store.totalRevenue?.toLocaleString()} ₿</td>
                        <td className="px-6 py-4 text-end text-sm font-medium">
                          <button
                            type="button"
                            className="px-2 py-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-1 border-dominos-link text-dominos-link hover:border-jwt-red hover:text-jwt-red"
                            onClick={() => closeStore(franchise, store)}>
                            <TrashIcon />
                            Close
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button className="flex-none" title="Create store" onPress={createStore} />
    </View>
  );
}

function whyFranchise() {
  return (
    <View title="So you want a piece of the pie?">
      <div className="text-start py-8 px-4 sm:px-6 lg:px-8">
        <div className="my-4 bg-dominos-sky border-4 border-dominos-blue text-sm text-dominos-navy rounded-lg p-4/10" role="alert">
          <div className="flex">
            <div className="ms-4">
              <div className="my-3 text-sm text-dominos-navy">
                <span className="mx-2">
                  <CautionIcon />
                </span>
                If you are already a franchisee, please
                <span className="font-semibold mx-1 text-dominos-navy underline">
                  <NavLink to="/franchise-dashboard/login">login</NavLink>
                </span>
                using your franchise account
              </div>
            </div>
          </div>
        </div>

        <div>
          <OrderNow />
          <p className="py-2 text-jwt-brown text-start mx-4 pb-4 first-line:uppercase first-line:tracking-widest  first-letter:text-7xl first-letter:font-bold first-letter:text-jwt-red  first-letter:mr-3 first-letter:float-left">
            Now is the time to get in on the JWT Pizza tsunami. The pizza sells itself. People cannot get enough. Setup your shop and let the pizza
            fly. Here are all the reasons why you should buy a franchise with JWT Pizza.
          </p>
          <img src="jwt-pizza-logo.png" className="border-solid border-2 border-dominos-blue w-64 m-4 float-end" />
          <p className="py-2 text-jwt-brown">
            Owning a franchise with JWT Pizza can be highly profitable. With our proven business model and strong brand recognition, you can expect to
            generate significant revenue. Our profit forecasts show consistent growth year after year, making it a lucrative investment opportunity.
          </p>
          <p className="py-2 text-jwt-brown">
            In addition to financial success, owning a franchise also allows you to make a positive impact on your community. By providing delicious
            pizzas and creating job opportunities, you contribute to the local economy and bring joy to people's lives. It's a rewarding experience
            that combines entrepreneurship with social responsibility. The following table shows a possible stream of income from your franchise.
          </p>
          <p className="py-2 text-jwt-brown">
            But it's not just about the money. By becoming a franchise owner, you become part of a community that is passionate about delivering
            exceptional pizzas and creating memorable experiences. You'll have the chance to build a team of dedicated employees who share your vision
            and work together to achieve greatness. And as your business grows, so does your impact on the local economy, creating jobs and bringing
            joy to countless pizza lovers.
          </p>
          <div className="bg-neutral-100 overflow-clip my-4">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-dominos-gray-200">
                      <thead className="uppercase text-jwt-brown bg-dominos-sky border-b-2 border-dominos-blue">
                        <tr>
                          {['Year', 'Profit', 'Costs', 'Franchise Fee'].map((header) => (
                            <th key={header} scope="col" className="px-6 py-3 text-center text-xs font-medium">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dominos-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-center font-medium text-dominos-navy">2020</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">50 ₿</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">400 ₿</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">50 ₿</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-center font-medium text-dominos-navy">2021</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">150 ₿</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">500 ₿</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">50 ₿</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-center font-medium text-dominos-navy">2022</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">300 ₿</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">600 ₿</td>
                          <td className="px-6 py-4 text-sm text-center text-dominos-gray-900">50 ₿</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4">
            <h2 className="py-2 text-2xl sm:text-4xl font-thin text-dominos-blue">Unleash Your Potential</h2>
            <p className="py-2 text-jwt-brown text-start mx-4 pb-4 first-line:uppercase first-line:tracking-widest  first-letter:text-7xl first-letter:font-bold first-letter:text-jwt-red  first-letter:mr-3 first-letter:float-left">
              Are you ready to embark on a journey towards unimaginable wealth? Owning a franchise with JWT Pizza is your ticket to financial success.
              With our proven business model and strong brand recognition, you have the opportunity to generate substantial revenue. Imagine the
              thrill of watching your profits soar year after year, as customers flock to your JWT Pizza, craving our mouthwatering creations.
            </p>
          </div>
        </div>
      </div>
    </View>
  );
}

function OrderNow() {
  return (
    <p className="py-2 text-jwt-brown">
      <span className="mx-2 text-dominos-link inline-block animate-pulse uppercase">Call now</span>
      <span className="font-semibold text-dominos-link underline">
        <a href="tel:800-555-5555">800-555-5555</a>
      </span>
      {'  '}
    </p>
  );
}
