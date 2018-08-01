import {
  findByAccount,
  BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_REQUEST,
  BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_SUCCESS,
  BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_FAILURE
} from '../../../../../../src/actions/bitcoin/api/addresses/findByAccount';

const dispatchMock = jest.fn((action) => {
  if (typeof action === 'function') {
    return action(jest.fn(), () => ({
      settings: {
        api: {
          baseUrl: 'bcec9c48-582e-4cb0-a176-f797a5302d50'
        },
        bitcoin: {
          network: 'testnet'
        }
      }
    }));
  }

  return action;
});

const getStateMock = jest.fn(() => ({
  settings: {
    api: {
      baseUrl: '0b8eb91d-9c42-4fb0-8c5b-45009727a58d'
    },
    bitcoin: {
      network: 'testnet'
    }
  },
  keys: {
    items: {
      '83d1e71d-8934-4005-b926-ce8596cba7dd': {}
    }
  }
}));

jest.mock('../../../../../../src/crypto/getMnemonicByKey', () => {
  return () => Promise.resolve('chicken approve topic suit shiver party whale holiday pitch source angry naive');
});

jest.mock('../../../../../../src/actions/bitcoin/api/transactions/getByAddress', () => ({
  getByAddress: (addresses) => {
    if (addresses.includes('mfzwDkHsb5xQEhsCam6CLAtsadrWDGoaxD')) {
      // Mocking batch 1.
      return () => Promise.resolve({
        mfzwDkHsb5xQEhsCam6CLAtsadrWDGoaxD: [],
        moYihV4R1FoSbnukt9sV3WqeFNHnvxfesx: [
          {
            txid: '268b0e2f1c4f29d8aacf81d6581507cd1b0e4019f01e820fa9d799596084bcba'
          },
          {
            txid: '0d62b11a6cd06678a8635bf206ebd622af30a7ea57c71ac704c9455189dd51bc'
          },
          {
            txid: 'a25368e98b7c735a32a3f1a5eae51d4aa521c06b5e5864e402805c7bc4909713'
          }
        ],
        ms4rFPmgg1TSyGFyP5hFU3xbSoPsTq7d2f: [],
        mqoeAawPQFwKQozx8LxMndXTMSznrzU3Rf: [],
        mwt8HghoB84FnhxU5vxjaMkbWhWwpVuoM9: [
          {
            txid: 'b2f4cefaf86ef18bcad2763efbd53d95b94973b5eb03045e3351b5d18286c26b'
          },
          {
            txid: '90fb1fc847f6495f917c692404ac9a2128fe327cf8b6efeb0187fca5b8fa225f'
          }
        ],
        n3sX3qZUojd3P9yATtvmudyf35NQ22z2wy: [],
        myTSCau8UTFA6gLX6eZY8hpdn7CmNBnppv: [],
        mhq7TKCaqbwkG1Cc7YF6cvu8yeLdmHxWmn: [],
        moQaGuAUPKAMjSK289VxjsPN8LEqC16Hy5: [],
        mkhvNJXSB9qbAtHPmVAFDd4EY2WS2dkDAr: []
      });
    }

    if (addresses.includes('mgDFAzh7p77KvehcSFfJLEpvBTjggPY6Rf')) {
      // Mocking batch 2.
      return () => Promise.resolve({
        mgDFAzh7p77KvehcSFfJLEpvBTjggPY6Rf: [],
        mm5RDbAvm95J2K5LXWNyzJHBf23rEb5hxz: [],
        mhGrKsoVuc4gK878bdTPTjsrAMQzv5B8rA: [],
        moJPrSWQ9TwvEcCVw8H8aXbwZAWn4CmSav: [],
        mrCRSZCNEJK8i9R3arrrK6sSUg1uRZnbEs: [],
        mmZCrDKuNjxTHgDP7Jewgq1RJfV4LfAsLn: [],
        n1567Ad37qkiyse76MoyStRPnQzm1x2gur: [],
        mpae3a52rurkpkMUr9ywarB2kARdj8Koxj: [],
        moBwMSXcNnwjZSA9RWTyejngy7f8oihR3F: [],
        myu9rhaF92LyZ1TFTvT1YGQqkNstWnNxKz: []
      });
    }

    if (addresses.includes('n2VusdnF19PNhUV71JYAcBPrtZLVrU9sV6')) {
      // Mocking batch 3.
      return () => Promise.resolve({
        n2VusdnF19PNhUV71JYAcBPrtZLVrU9sV6: [],
        mpcRcVi4gREn6z2SatyRDCsxKBoQtWALuW: [],
        mhcc5nseXigDngM59cT8GU7QS4YmocsUbx: [],
        mfx6HGqnFbwH5F4QGZY76NttGk9J5SsvhS: [],
        mhhCyY6GtGTPEDjG6Xz3Dv6LgJdUtJfX9n: [],
        mgP7Z5BLa3PTcjuXcN1nQwUncfLHw4Huoo: [],
        mk3xeuQiqaBqx8ChjYVADyUsmSk68tfDmL: [],
        mpYgdRQcztNXcqVPvqonyRAGMQJ8wBuPaY: [],
        moKbcq1oJp173MykfG3Ra9hGU2XMDCe5YL: [],
        msrAVGNuWsMRDyDv8fQD1BHNoRWmem6suB: []
      });
    }
  }
}));

describe('BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_REQUEST', () => {
  it('equals "BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_REQUEST"', () => {
    expect(BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_REQUEST).toBe('BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_REQUEST');
  });
});

describe('BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_SUCCESS', () => {
  it('equals "BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_SUCCESS"', () => {
    expect(BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_SUCCESS).toBe('BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_SUCCESS');
  });
});

describe('BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_FAILURE', () => {
  it('equals "BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_FAILURE"', () => {
    expect(BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_FAILURE).toBe('BITCOIN_API_ADDRESSES_FIND_BY_ACCOUNT_FAILURE');
  });
});

describe('findByAccount', () => {
  it('finds and returns all addresses with transactions for the specified account', () => {
    const accountIndex = 0;

    const expectedResult = [
      {
        address: 'mfzwDkHsb5xQEhsCam6CLAtsadrWDGoaxD',
        transactions: []
      },
      {
        address: 'moYihV4R1FoSbnukt9sV3WqeFNHnvxfesx',
        transactions: [
          {
            txid: '268b0e2f1c4f29d8aacf81d6581507cd1b0e4019f01e820fa9d799596084bcba'
          },
          {
            txid: '0d62b11a6cd06678a8635bf206ebd622af30a7ea57c71ac704c9455189dd51bc'
          },
          {
            txid: 'a25368e98b7c735a32a3f1a5eae51d4aa521c06b5e5864e402805c7bc4909713'
          }
        ]
      },
      {
        address: 'ms4rFPmgg1TSyGFyP5hFU3xbSoPsTq7d2f',
        transactions: []
      },
      {
        address: 'mqoeAawPQFwKQozx8LxMndXTMSznrzU3Rf',
        transactions: []
      },
      {
        address: 'mwt8HghoB84FnhxU5vxjaMkbWhWwpVuoM9',
        transactions: [
          {
            txid: 'b2f4cefaf86ef18bcad2763efbd53d95b94973b5eb03045e3351b5d18286c26b'
          },
          {
            txid: '90fb1fc847f6495f917c692404ac9a2128fe327cf8b6efeb0187fca5b8fa225f'
          }
        ]
      }
    ];

    return findByAccount(accountIndex)(dispatchMock, getStateMock).then((addresses) => {
      expect(addresses).toMatchObject(expectedResult);
    });
  });
});
