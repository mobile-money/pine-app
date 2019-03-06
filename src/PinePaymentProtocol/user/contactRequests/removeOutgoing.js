import { getKeyPairFromMnemonic } from '../../crypto';
import { parse as parseAddress, resolveBaseUrl } from '../../address';
import { getAuthorizationHeader } from '../../authentication';

/**
 * Removes an outgoing contact request from the recepient's Pine server.
 *
 * @param {string} contactRequest - Contact request to remove.
 * @param {string} contactRequest.id - ID of the contact request to remove.
 * @param {string} contactRequest.from - Pine address the contact request was sent from.
 * @param {string} contactRequest.to - Pine address the contact request was sent to.
 * @param {string} contactRequest.toUserId - ID of the user the contact request was sent to.
 * @param {string} mnemonic - Mnemonic to authenticate and sign the request with.
 *
 * @returns {Promise} A promise that resolves if the contact request was removed.
 */
const removeOutgoing = (contactRequest, mnemonic) => {
  const { hostname } = parseAddress(contactRequest.to);
  const keyPair = getKeyPairFromMnemonic(mnemonic);
  const baseUrl = resolveBaseUrl(hostname);
  const path = `/v1/users/${contactRequest.toUserId}/contact-requests/${contactRequest.id}`;
  const url = `${baseUrl}${path}`;

  const fetchOptions = {
    method: 'DELETE',
    headers: {
      Authorization: getAuthorizationHeader(contactRequest.from, path, '', keyPair)
    }
  };

  return fetch(url, fetchOptions)
    .then((response) => {
      if (response.ok) {
        return;
      }

      return response.json().then((responseError) => {
        const error = new Error(responseError.message);
        error.code = response.status;
        throw error;
      });
    });
};

export default removeOutgoing;
